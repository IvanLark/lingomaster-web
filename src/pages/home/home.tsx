import HomeNaviTab, { HomeNaviTabProps } from './components/home-navi-tab.tsx';
import Icon from "../../../public/智臻.svg";

export default function Home() {

	const tabs: HomeNaviTabProps[] = [
		{ title: '单词查询', icon: '🧐', path: '/query' },
		{ title: 'AI对话', icon: '🤗', path: '/chat' },
		{ title: '单词复习', icon: '🤓', path: '/review' },
		{ title: '错误页面', icon: '❌', path: '/error-test' },
		{ title: '测试页面', icon: '🥳', path: '/test' }
	]

	return (
		<div className="w-screen h-screen relative">
			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
			 flex flex-col items-center gap-4">
				{/* dTODO 加个菜单标题 */}
				<h1 className="w-full text-center mb-10 text-6xl font-bold">
					<img src={Icon} alt="智臻" className="size-24 inline-block mr-2" />
					智臻
				</h1>
				{
					tabs.map((tab, index) =>
						<HomeNaviTab key={index} {...tab} />
					)
				}
			</div>
		</div>
	);
}