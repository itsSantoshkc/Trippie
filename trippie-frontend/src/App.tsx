import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {
  customValue,
  decrement,
  increment,
  reset,
} from "./redux/slice/counterSlice";
import { Navbar } from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Admin/Dashboard";
import Index from "./pages/User/Index";

function App() {
  const count = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <>
      {/* <Navbar /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
      {/* <div className="text-3xl font-semibold bg-white">{count}</div>
      <button
        className="p-5 m-5 border cursor-pointer rounded-xl"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <button
        className="p-5 m-5 border cursor-pointer rounded-xl"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
      <button
        className="p-5 m-5 border cursor-pointer rounded-xl"
        onClick={() => dispatch(reset())}
      >
        Reset
      </button>
      <button
        className="p-5 m-5 border cursor-pointer rounded-xl"
        onClick={() => dispatch(customValue(30))}
      >
        Reset
      </button> */}
    </>
  );
}

export default App;
