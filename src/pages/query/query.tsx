import React, { useEffect, useState } from "react";
import QueryGraph from "./pages/graph/query-graph.tsx";
import QueryData from "./pages/data/query-data.tsx";
import { Edge, Node } from "../../api/types/word-data.types.ts";
import QueryHeader from "./pages/query-header.tsx";
import { toast } from "../../common/utils/toast.util.tsx";
import { checkWordExisted } from "../../api/methods/word-search.methods.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {ArrowRight, HomeOutlined} from "@mui/icons-material";
import QueryBlank from "./pages/query-blank.tsx";

/**
 * 单词查询页面
 * @constructor
 */
export default function Query() {
  // 当前查询单词
  const storedCurWord = sessionStorage.getItem('query:cur-word');
  const initCurWord = storedCurWord ? storedCurWord : '';
  const [curWord, setCurWord] = useState<string>(initCurWord);

  // 历史查询单词
  const storedHistory = sessionStorage.getItem('query:history');
  const initHistory = storedHistory ? JSON.parse(storedHistory) : {
    nodes: [{id: getNodeId('Word', 'make'), key: 'make', type: 'Word', label: 'make'}], edges: []
  };
  const [history, setHistory] = useState<{ nodes: Array<Node>, edges: Array<Edge> }>(initHistory);

  useEffect(() => {
    sessionStorage.setItem('query:history', JSON.stringify(history));
    sessionStorage.setItem('query:cur-word', curWord);
  }, [curWord, history]);

  function getNodeId(nodeType: string, nodeKey: string): string {
    return `${nodeType}@${nodeKey}`;
  }

  // 添加节点和边
  function addNodesAndEdges(nodes: Array<Node>, edges: Array<Edge>) {
    const newNodes: Array<Node> = [];
    const newEdges: Array<Edge> = [];
    nodes.forEach((node) => {
      let isExisted = false;
      history.nodes.forEach(nodeItem => {
        if (nodeItem.id === node.id) isExisted = true;
      })
      // 节点不存在则添加节点
      if (!isExisted) newNodes.push(node);
    })
    edges.forEach((edge) => {
      const edgeId1 = `${edge.source}&${edge.target}`;
      const edgeId2 = `${edge.target}&${edge.source}`;
      let isExisted = false;
      history.edges.forEach(edgeItem => {
        if (edgeItem.id === edgeId1 || edgeItem.id === edgeId2) isExisted = true;
      });
      edge.id = edgeId1;
      // 边不存在则添加边
      if (!isExisted) newEdges.push(edge);
    })
    setHistory({
      nodes: [
        ...history.nodes,
        ...newNodes
      ],
      edges: [
        ...history.edges,
        ...newEdges
      ]
    });
  }

  // 处理单词数据页面中点击单词事件
  function handleSkipWord(newWord: string, relationType: string, relationLabel: string = relationType): void {
    if (newWord === curWord) {
      scrollBackToTop();
      return;
    }
    checkWordExisted(newWord).then(() => {
      // 添加nodes和edge
      addNodesAndEdges([{
        id: getNodeId('Word', newWord),
        key: newWord,
        type: 'Word',
        label: newWord
      } as Node], [{
        id: '',
        type: relationType,
        label: relationLabel,
        source: getNodeId('Word', curWord),
        target: getNodeId('Word', newWord)
      } as Edge])
      // 选中新单词
      setCurWord(newWord);
      scrollBackToTop();
    }).catch(() => {
      toast.error('不好意思，词库里没有这个词');
    });
  }

  function scrollBackToTop() {
    document.getElementById('scroll-container-start')!.scrollIntoView({behavior: 'smooth'});
  }

  const [headLeftBtn, setHeadLeftBtn] = useState({
    icon: <HomeOutlined style={{fontSize: "2.5rem"}}/>,
    onClick: () => {
      navigate('/');
    }
  });
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.state !== null) {
      handleSkipWord(location.state.word, '查询', '查询');
      setHeadLeftBtn({
        icon: <ArrowRight style={{fontSize: "2.5rem"}}/>,
        onClick: () => {
          navigate(-1);
        }
      });
    }
  }, [location.state]);

  function handleSearch(newWord: string) {
    addNodesAndEdges([{
      id: getNodeId('Word', newWord),
      key: newWord,
      type: 'Word',
      label: newWord
    } as Node], []);
    setCurWord(newWord);
    scrollBackToTop();
  }

  // 单词查询页面
  return (<>
    {
      curWord === '' ?
      <QueryBlank handleSearch={handleSearch}/> :
      <div className="w-screen h-[calc(100vh-4rem)]">
        <QueryHeader word={curWord} handleSkipWord={handleSkipWord}
                     leftBtnIcon={headLeftBtn.icon}
                     leftBtnOnClick={headLeftBtn.onClick}/>
        <QueryGraph word={curWord} history={history}
                    handleSkipWord={(newWord) => {
                      setCurWord(newWord);
                      scrollBackToTop();
                    }}></QueryGraph>
        <QueryData word={curWord} handleSkipWord={handleSkipWord}></QueryData>
      </div>
    }
  </>);
}