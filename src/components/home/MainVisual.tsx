import img01 from "../../assets/images/home/mainVisual01.png";
import img02 from "../../assets/images/home/mainVisual02.png";
import img03 from "../../assets/images/home/mainVisual03.png";
import img04 from "../../assets/images/home/mainVisual04.png";
import img05 from "../../assets/images/home/mainVisual05.png";
import img06 from "../../assets/images/home/mainVisual06.jfif";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const SLIDES = [
    { id: 1, image: img01, title: "WINTER RUNNING", sub: "겨울 러닝을 위한 퍼포먼스 웨어" },
    { id: 2, image: img02, title: "WINTER OUTER", sub: "따뜻한 일상을 위한 겨울 아이템" },
    {
        id: 3,
        image: img03,
        title: "INFINITE RUSH",
        sub: "강력한 추진력과 에너지 리턴의 레이싱 파트너",
    },
    { id: 4, image: img04, title: "사패2", sub: "한국타이어 기술력을 담은 트레일 러닝화" },
    { id: 5, image: img05, title: "HYPER RUSH 2", sub: "지칠 때 더 가볍게, 탄력적인 카본 러닝화" },
    { id: 6, image: img06, title: "MARATHON 220", sub: "클래식이 만든 새로운 속도" },
];

function MainVisual() {
    const [firstSwiper, setFirstSwiper] = useState(null);
    const [secondSwiper, setSecondSwiper] = useState(null);

    return (
        <section className={twMerge(["w-full", "flex", "flex-col", "group"])}>
            <div className={twMerge(["w-full", "h-[500px]", "md:h-[700px]", "relative", "bg-green-400"])}>
                {/* 첫번째 이미지 슬라이더 */}
            </div>
            <div className={twMerge(["w-full", "py-10", "border-b", "border-gray-100"])}>
                {/* 두번째 텍스트 슬라이더 */}
            </div>
        </section>
    );
}

export default MainVisual;
