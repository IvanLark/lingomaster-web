import { useState } from "react";
import { Skeleton } from "@mui/material";

/**
 * "连体"样式的Tabs
 * @param tabs
 * @param children
 * @constructor
 */

export interface ContinuousTabsProps<T> {
	tabs: Record<string, T>; // Tab名称加对应数据组成的 key-value 类型
	children: (value: T) => JSX.Element | JSX.Element[]; // 渲染value的函数，返回JSX
	isLoading: boolean;
}

export default function ContinuousTabs<T>({ tabs, children, isLoading }: ContinuousTabsProps<T>) {
	const [pickedIndex, setPickedIndex] = useState(0);

	return (
		isLoading ?
			<Skeleton variant="rectangular" height="40px" /> :
			<>
				{/* Tabs选项 */}
				<ul className="w-full flex select-none relative rounded-lg border-2 border-black">
					<div
						className="rounded-md bg-black absolute pointer-events-none transition-all duration-300"
						style={{
							width: `${100 / Object.keys(tabs).length}%`,
							height: '2.5rem',
							left: `${pickedIndex * 100 / Object.keys(tabs).length}%`
						}}>
					</div>
					{Object.keys(tabs).map((tabName, index) =>
						<li
							key={index}
							className={`
							btn-common-hover text-xl h-10 py-2 relative flex-1 text-center rounded-md list-none
							transition-all duration-300 ${index === pickedIndex ? 'text-white bg-blac' : ''}
						`}
							onClick={() => { setPickedIndex(index) }}>
							{tabName}
						</li>
					)}
				</ul>
				{/* 渲染当前Tab */}
				{children(Object.values(tabs)[pickedIndex])}
			</>
	);
}