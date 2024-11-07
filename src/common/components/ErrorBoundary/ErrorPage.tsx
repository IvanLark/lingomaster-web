import { Error } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function ErrorPage({ error }: { error: Error }) {
	const navigate = useNavigate();
	return (
		<div className="w-full h-full flex flex-col justify-center items-center">
			<Error style={{ fontSize: '6rem' }} color="error" />
			<h1 className="text-3xl font-bold text-red-500">很抱歉，应用发生了错误😢</h1>
			<p className="text-xl">错误：{error ? error.message : '欸Σ(っ °Д °;)っ没发生错误啊……'}</p>
			{/* // TODO 这里返回上一级后错误依然留存，除了刷新不知道如何解决 */}
			<button className="btn-scale btn-grey px-4 py-2 mt-4 rounded-lg" onClick={() => { navigate(-1); setTimeout(() => { window.location.reload() }, 500) }}>返回上一级</button>
		</div>
	)
}