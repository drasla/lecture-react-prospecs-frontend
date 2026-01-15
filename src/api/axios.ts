import axios from "axios";

// 상수. constant. 뭔가 딱 정해져 있는, 바뀌지 않는 값을 마련.
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const httpClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",   // 내가 요청을 할 때에는 json 형식으로 내용을 적어서 보낼거야
        "x-client-key": API_KEY,           // 이건 백엔드에서 정한 사항. 인증코드를 넣어서 요청을 보낼거야
    }
});