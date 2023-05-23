import { BaseSyntheticEvent, SyntheticEvent, useEffect, useState } from "react";
import { generateRandom, visualizeChange } from "../../utils/Algo";

type Props = {};
type VerticalBarType = {
	index: number;
	value: 0 | 1 | 2;
};

const VerticalBar = ({ index, value }: VerticalBarType) => {
	return (
		<div
			id={`bar-${value}`}
			style={{
				left: `${2 * index + index * 0.5 + 1}rem`,
			}}
			className={`transition-all w-8 rounded ${"h-10 bg-[#17A68C]"}  absolute bottom-4 flex items-center flex-col-reverse text-slate-200 `}>
			{value}
		</div>
	);
};

const RadixAlgo = ({}: Props) => {
	const [text, setText] = useState("AABAACAADAABAAABAAAA");
	const [pattern, setPattern] = useState("AABA");
	const [patternFound, setPatternFound] = useState<
		{ start: number; end: number }[]
	>([]);
	const [delay, setDelay] = useState(0.25);
	const [start, setStart] = useState(false);

	const visualize = async () => {
		setPatternFound([]);
		setStart(true);
		await visualizeChange(text, pattern, setPatternFound, delay);
		setStart(false);
	};

	const resetSort = () => {
		setStart(false);
		setPatternFound([]);
	};

	const handleTextInput = (event: BaseSyntheticEvent) => {
		const value = event.target.value;
		if (value.length <= 20) {
			setText(value);
		}
	};
	const handlePatternInput = (event: BaseSyntheticEvent) => {
		const value = event.target.value;
		if (value.length <= text.length) {
			setPattern(value);
		}
	};
	useEffect(() => {
		if (patternFound.length) {
			setPatternFound([]);
			setStart(false);
		}
	}, [text, pattern]);
	return (
		<div className="flex   gap-4">
			<div className="flex gap-4 flex-col w-40 self-center">
				<button
					disabled={start}
					onClick={() => {
						visualize();
					}}
					className={`flex-shrink-0 px-4 py-2 text-base font-semibold text-white  rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200 ${
						start
							? "bg-gray-500 hover:bg-gray-500"
							: "bg-purple-600 hover:bg-purple-700"
					} w-fit`}>
					Find
				</button>
				<button
					disabled={start}
					onClick={resetSort}
					className={`flex-shrink-0 px-4 py-2 text-base font-semibold text-white  rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-200 w-fit  ${
						start
							? "bg-gray-500 hover:bg-gray-500"
							: "bg-red-600 hover:bg-red-700"
					}`}>
					Reset
				</button>

				<span className="text-white">Pattern Found</span>
				<div
					className="text-white bg-[#292927] px-4 py-2 rounded"
					id="pattern-found-counter">
					0
				</div>
				<span className="text-white">Animation Time</span>
				<select
					value={delay}
					className="rounded-lg px-4 self-stretch py-2"
					onChange={(e) => setDelay(+e.target.value)}>
					<option value={0.25}>0.25s</option>
					<option value={0.5}>0.5s</option>
					<option value={1}>1s</option>
				</select>
			</div>
			<div className="flex flex-col gap-4">
				<div className="flex bg-[#292927]  p-2 gap-4">
					<div className=" relative flex items-center gap-2">
						<div className="text-white">Main Text</div>
						<input
							value={text}
							onChange={handleTextInput}
							type="text"
							id="rounded-email"
							className=" rounded  border-transparent flex-1 appearance-none border border-gray-300 w-60 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent "
							placeholder="Main Text Max 20 Character"
						/>
					</div>
					<div className=" relative flex items-center gap-2">
						<div className="text-white">Pattern</div>
						<input
							value={pattern}
							type="text"
							id="rounded-email"
							className=" rounded  border-transparent flex-1 appearance-none border border-gray-300 w-60 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent "
							placeholder="Pattern"
							onChange={handlePatternInput}
						/>
					</div>
				</div>
				<div
					key={text}
					className="w-[51rem] bg-[#292927] h-52 relative p-4">
					<div
						id="search-box"
						className={
							"w-8 transition-all absolute bg-yellow-200 h-24 rounded bottom-4"
						}></div>
					{patternFound.map((item) => (
						<div
							className={
								"transition-all absolute bg-slate-200 h-16 rounded bottom-4 animate-fadeIntoView"
							}
							style={{
								left: `${
									2 * item.start + item.start * 0.5 + 1
								}rem`,
								width: `${
									0.5 * item.end + (item.end + 1) * 2
								}rem`,
							}}></div>
					))}
					{text.split("").map((value: any, idx) => (
						<VerticalBar index={idx} value={value} />
					))}
				</div>
				<div className="font-bold text-white border-b-4 border-b-[#292927]">
					Naive Algorithm For Pattern Searching
				</div>
			</div>
			<div className="flex gap-4 items-center"></div>
		</div>
	);
};

export default RadixAlgo;
