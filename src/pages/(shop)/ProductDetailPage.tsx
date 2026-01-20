import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import type { Product } from "../../types/product.ts";
import { getProduct } from "../../api/product.api.ts";

function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if(!id) return;

            try {
                const result = await getProduct(Number(id));
                setProduct(result);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        }
        
        fetchData().then(() => {});
    }, [id]);

    return <></>
}

export default ProductDetailPage;