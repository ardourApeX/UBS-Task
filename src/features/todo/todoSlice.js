import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	backlog: ["a", "b", "c"],
	todo: ["e", "f", "g"],
	ongoing: ["h", "i"],
	done: ["j"],
	active: {
		className: null,
		element: null,
	},
	flow: ["backlog", "todo", "ongoing", "done"],
};

export const counterSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		moveForward: (state, action) => {
			const { className, element } = action.payload;
			state[className] = state[className].filter((todo) => todo !== element);
			const idx = state.flow.indexOf(className);
			state[state.flow[idx + 1]].push(element);
			state.active.className = state.flow[idx + 1]
		},
		moveBackward: (state, action) => {
			const { className, element } = action.payload;
			state[className] = state[className].filter((todo) => todo !== element);
			const idx = state.flow.indexOf(className);
			state[state.flow[idx - 1]].push(element);
			state.active.className = state.flow[idx - 1]
		},
		addNew: (state, action) => {
			console.log(action.payload);
			const input = action.payload;
			state.backlog.push(input);
		},
		deleteTodo: (state, action) => {
			const { className, element } = action.payload;
			state[className] = state[className].filter((todo) => todo !== element);
			state.active = { className: null, element: null };
		},
		setActve: (state, action) => {
			state.active.className = action.payload.className;
			state.active.element = action.payload.element;
		},
	},
});

// Action creators are generated for each case reducer function
export const { addNew, deleteTodo, moveBackward, moveForward, setActve } =
	counterSlice.actions;

export default counterSlice.reducer;
