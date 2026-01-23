import { useNavigate } from "react-router";
import useOrderStore from "../../stores/useOrderStore.ts";
import useAuthStore from "../../stores/useAuthStore.ts";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../../components/common/Button.tsx";
import Input from "../../components/common/Input.tsx";
import Select from "../../components/common/Select.tsx";
import { FiMinus, FiPlus, FiX } from "react-icons/fi";

interface OrderFormData {
    recipientName: string;
    recipientPhone: string;
    zipCode: string;
    address1: string;
    address2: string;
    deliveryRequestType: string;
    deliveryRequestDirect: string;
    gatePassword: string;
}

function OrderPage() {
    const navigate = useNavigate();
    const { orderItems, getTotalPrice } = useOrderStore();
    const { user } = useAuthStore();

    const productsPrice = getTotalPrice();
    const shippingCost = productsPrice >= 50000 ? 0 : 3000;
    const finalPrice = productsPrice + shippingCost;

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<OrderFormData>();

    const deliveryRequestType = watch("deliveryRequestType");

    useEffect(() => {
        if (user) {
            reset({
                recipientName: user.name,
                recipientPhone: user.phone,
            });
        }
    }, [user]);

    if (orderItems.length === 0) {
        return (
            <div className={twMerge(["py-40", "text-center"])}>
                <p className={twMerge(["mb-4", "text-gray-500"])}>주문할 상품 정보가 없습니다.</p>
                <Button onClick={() => navigate("/")}>홈으로 이동</Button>
            </div>
        );
    }

    return (
        <div className={twMerge(["max-w-7xl", "mx-auto", "px-8", "py-40"])}>
            <h1 className={twMerge(["text-2xl", "font-bold", "mb-8"])}>ORDER / PAYMENT</h1>

            <div className={twMerge(["flex", "gap-10"])}>
                {/* 왼쪽 */}
                <div className={twMerge(["flex-1", "space-y-10"])}>
                    {/* 정보 입력 */}
                    <form id="order-form">
                        <h2
                            className={twMerge(
                                ["pb-3", "mb-5"],
                                ["text-lg", "font-bold", "border-b", "border-black"],
                            )}>
                            배송지 정보
                        </h2>
                        <div className={twMerge(["space-y-4"])}>
                            <div className={twMerge(["flex", "gap-4"])}>
                                <Input
                                    label={"받는 사람"}
                                    fullWidth={true}
                                    registration={register("recipientName", {
                                        required: "이름은 필수입니다.",
                                    })}
                                    error={errors.recipientName}
                                />
                                <Input
                                    label={"휴대폰 번호"}
                                    fullWidth={true}
                                    placeholder={"010-0000-0000"}
                                    registration={register("recipientPhone", {
                                        required: "전화번호는 필수입니다.",
                                        pattern: {
                                            value: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
                                            message: "올바른 형식이 아닙니다",
                                        },
                                    })}
                                    error={errors.recipientPhone}
                                />
                            </div>
                            <div className={twMerge(["space-y-2"])}>
                                <div className={twMerge(["flex", "gap-2", "items-end"])}>
                                    <div className={twMerge("flex-1")}>
                                        <Input
                                            label={"주소"}
                                            placeholder={"우편번호"}
                                            registration={register("zipCode", {
                                                required: "주소를 검색해주세요.",
                                            })}
                                            error={errors.zipCode}
                                            readOnly={true}
                                        />
                                    </div>
                                    <Button
                                        type={"button"}
                                        variant={"primary"}
                                        size={"md"}
                                        className={twMerge(["w-32"])}>
                                        주소 검색
                                    </Button>
                                </div>
                                <Input
                                    placeholder={"기본 주소"}
                                    registration={register("address1", { required: true })}
                                    readOnly={true}
                                />
                                <Input
                                    placeholder={"상세 주소"}
                                    registration={register("address2")}
                                />
                            </div>
                        </div>

                        <div className={twMerge(["space-y-2"])}>
                            <label
                                className={twMerge([
                                    "block",
                                    "text-xs",
                                    "font-bold",
                                    "text-gray-500",
                                ])}>
                                배송 메모
                            </label>
                            <Select
                                registration={register("deliveryRequestType")}
                                options={[
                                    { label: "배송 시 요청사항을 선택해주세요", value: "" },
                                    {
                                        label: "부재 시 문 앞에 놔주세요.",
                                        value: "부재 시 문 앞에 놔주세요.",
                                    },
                                    {
                                        label: "부재 시 경비실에 맡겨주세요.",
                                        value: "부재 시 경비실에 맡겨주세요.",
                                    },
                                    { label: "직접 입력", value: "DIRECT" },
                                ]}
                            />
                            {deliveryRequestType == "DIRECT" && (
                                <Input
                                    placeholder={"직접 입력"}
                                    registration={register("deliveryRequestDirect")}
                                />
                            )}
                        </div>
                        <Input
                            label={"공동현관 비밀번호"}
                            registration={register("gatePassword")}
                        />
                    </form>

                    {/* 상품 목록 */}
                    <section>
                        <h2 className={twMerge(["text-lg", "font-bold", "border-b", "border-black"], ["pb-3", "mb-5"])}>주문 상품</h2>

                        {orderItems.map(item => {
                            const product = item.productSize.productColor.product;
                            const color = item.productSize.productColor;
                            const image = color.images[0]?.url;

                            return (
                                <div
                                    key={item.id}
                                    className={twMerge(
                                        ["flex", "items-center", "py-6"],
                                        ["border-b", "border-gray-200"],
                                    )}>
                                    <div className={twMerge(["w-full", "flex", "gap-4"])}>
                                        <div className={twMerge(["w-24", "h-28", "bg-gray-100"])}>
                                            {image && (
                                                <img
                                                    src={image}
                                                    alt={product.name}
                                                    className={twMerge([
                                                        "w-full",
                                                        "h-full",
                                                        "object-cover",
                                                    ])}
                                                />
                                            )}
                                        </div>
                                        <div
                                            className={twMerge([
                                                "flex",
                                                "flex-col",
                                                "justify-center",
                                                "gap-1",
                                            ])}>
                                            <p className={twMerge(["font-bold", "text-gray-900"])}>
                                                {product.name}
                                            </p>
                                            <p className={twMerge(["text-sm", "text-gray-500"])}>
                                                {color.colorName} / {item.productSize.size} / {item.quantity}개
                                            </p>
                                            <p className={twMerge(["text-sm", "font-bold"])}>
                                                {(product.price * item.quantity).toLocaleString()}원
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </section>
                </div>

                {/* 오른쪽 */}
                <div></div>
            </div>
        </div>
    );
}

export default OrderPage;
