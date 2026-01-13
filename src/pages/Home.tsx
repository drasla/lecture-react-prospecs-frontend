import { twMerge } from "tailwind-merge";
import MainVisual from "../components/home/MainVisual.tsx";

function Home() {
    return (
        <div className={twMerge(["min-h-screen", "flex", "flex-col"])}>
            <MainVisual />
        </div>
    );
}

export default Home;
