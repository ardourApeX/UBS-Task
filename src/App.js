import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
	addNew,
	deleteTodo,
	moveBackward,
	moveForward,
	setActve,
} from "./features/todo/todoSlice";
function Control() {
	const dispatch = useDispatch();
	const [input, setInput] = useState(null);
	console.log(input);
	const { active } = useSelector((state) => state.todo);
	console.log("active", active);
	return (
		<div>
			<h1>Controls</h1>
			<div>
				<input
					onChange={(e) => {
						setInput(e.target.value);
					}}
				/>
				<button
					onClick={() => dispatch(addNew(input))}
					disabled={input === null ? true : false}
				>
					Create
				</button>
			</div>
			<div>
				<input placeholder={active.element} disabled></input>
				<button
					onClick={() => dispatch(moveBackward(active, active))}
					disabled={
						active.element && active.className !== "backlog" ? false : true
					}
				>
					Move back
				</button>
				<button
					onClick={() => dispatch(moveForward(active, active))}
					disabled={
						active.element && active.className !== "done" ? false : true
					}
				>
					Move Forward
				</button>
				<button
					onClick={() => dispatch(deleteTodo(active))}
					disabled={active ? false : true}
				>
					Delete
				</button>
			</div>
		</div>
	);
}
function App() {
	const todos = useSelector((state) => state.todo);
	const dispatch = useDispatch();
	return (
		<div className="App">
			<Control />
			<div
				style={{
					display: "flex",
					width: "100%",
					paddingRight: "1rem",
					justifyContent: "space-between",
				}}
			>
				<div>
					<h1>BackLog</h1>
					{todos?.backlog?.map((todo) => {
						return (
							<ul>
								<li
									onClick={() =>
										dispatch(setActve({ className: "backlog", element: todo }))
									}
								>
									{todo}
								</li>
							</ul>
						);
					})}
				</div>
				<div>
					<h1>To Do</h1>
					{todos?.todo?.map((todo) => {
						return (
							<ul>
								<li
									onClick={() =>
										dispatch(setActve({ className: "todo", element: todo }))
									}
								>
									{todo}
								</li>
							</ul>
						);
					})}
				</div>
				<div>
					<h1>Ongoing</h1>
					{todos?.ongoing?.map((todo) => {
						return (
							<ul>
								<li
									onClick={() =>
										dispatch(setActve({ className: "ongoing", element: todo }))
									}
								>
									{todo}
								</li>
							</ul>
						);
					})}
				</div>
				<div>
					<h1>Done</h1>
					{todos?.done?.map((todo) => {
						return (
							<ul>
								<li
									onClick={() =>
										dispatch(setActve({ className: "done", element: todo }))
									}
								>
									{todo}
								</li>
							</ul>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default App;
