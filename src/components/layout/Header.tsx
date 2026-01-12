import Logo from "../../assets/images/logo_bk.svg";
import { Link, useLocation } from "react-router";
import useLayoutStore from "../../stores/useLayoutStore.ts";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { IoMenu } from "react-icons/io5";

const MENU = [
    { name: "RUNNING", path: "/running" },
    { name: "SPORTS STYLE", path: "/sports-style" },
    { name: "HERITAGE", path: "/heritage" },
    { name: "SPORTS", path: "/sports" },
    { name: "ONE SPEC", path: "/one-spec" },
    { name: "OUR STORY", path: "/our-story" },
];

function Header() {
    const { pathname } = useLocation();
    const { isTopBannerVisible } = useLayoutStore();

    // 스크롤이 내려갔는지 안 내려갔는지를 체크해서 스타일링을 해줘야 함
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        // 사용자가 스크롤을 조금이라도 움직이면 이 handleScroll이라고 하는 함수가 발동되는데
        // 만약 사용자가 Y스크롤의 값을 0보다 크게 가져간다면 (즉, 스크롤을 내렸다면)
        // setIsScrolled의 값을 true로 변환. Y 스크롤의 값이 0이 된다면 false 변환.
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        // addEventListener(동작방식, 함수);
        // addEventListener : 동작방식에 기재한 것을 감지하여 함수를 실행하는 메소드
        // 창 자체에 scroll 이벤트를 감지하는 함수를 만듦
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // isHome : 사용자가 홈에 위치할 때에만 true
    const isHome = pathname === "/";

    // isTransparent : 배경이 투명일 경우엔 사용자가 Home에 위치하고 스크롤이 맨 위에 있을 때만
    const isTransparent = isHome && !isScrolled;

    return (
        <header
            className={twMerge(
                ["fixed", "left-0", "right-0", "z-60"],
                ["transition-all", "duration-300", "border-b"],
                isTransparent
                    ? ["bg-transparent", "border-transparent", "text-white"]
                    : ["bg-white", "border-gray-100"],
                isTopBannerVisible ? ["top-9"] : ["top-0"],
            )}>
            <div
                className={twMerge(
                    ["container", "mx-auto", "px-4", "h-20"],
                    ["flex", "justify-between", "items-center"],
                )}>
                {/* 왼쪽 영역 */}
                <div className={twMerge(["flex", "items-center", "gap-5"])}>
                    <button className={twMerge(["lg:hidden", "text-2xl"])}>
                        <IoMenu />
                    </button>
                    <Link to={"/"}>
                        <img src={Logo} alt={"Logo"}/>
                    </Link>
                </div>

                {/* 오른쪽 영역 */}
                <div className={twMerge(["flex", "items-center"])}></div>
            </div>

        </header>
    );
}

export default Header;
