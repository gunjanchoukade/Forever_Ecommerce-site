import { createContext,useEffect,useState } from "react";
import axios from "axios"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const shopDataContext = createContext()

const ShopProvider = ({children})=>{
    const currency = '₹';
    const delivery_fee = 10;
    const [searched,setSearched] = useState('');
    const [showBar,setShowBar] = useState(false)
    const [cartItems,setCartItems] = useState({});
    const [products,setProducts] = useState([])
    const [token,setToken] = useState('')
    const cartData = structuredClone(cartItems);

    const addItemstoCart=async (id,size)=>{
        if(!size){
            toast.error("Please,Select any size!");
            return;
        }
        if(cartData[id]){
            if(cartData[id][size]){
                cartData[id][size] += 1;
            }else{
                cartData[id][size] = 1;
            }
        }else{
            cartData[id]={};
            cartData[id][size]=1;
        }
        setCartItems(cartData)
        if(token){
            try{
                console.log("hi")
                const response = await axios.post("http://localhost:3000/cart/add",{id,size},{headers:{token}})
                console.log("add shop context respone",response);
            }catch(error)
            {
                console.log(error)
            }
        }
        
    }
    const cartItemsCount = ()=>{
        let totalCount = 0;
        for(const i in cartItems){
            for(const j in cartItems[i]){
                if(cartItems[i][j] > 0){
                    totalCount += cartItems[i][j];
                }
            }
        }
        return totalCount;
    }
    const updateCartItems = async (id,size,quantity) =>{
        let copyOfCart = structuredClone(cartItems)

        copyOfCart[id][size]=quantity;

        setCartItems(copyOfCart);
        if(token){
            try {
                const response = await axios.post("http://localhost:3000/cart/update",{id,size,quantity},{headers:{token}})
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
        
    }

    const cartTotal = ()=>{
        let total = 0;
        for(const i in cartItems){
            const original = products.find((product)=>product._id === i);
            
            for(const j in cartItems[i]){
                if(cartItems[i][j] > 0){
                    total += original.price * cartItems[i][j]
                } 
            }
        }
     
        return total;
   }

    const getProducts = async () => {
        try{
            const response =  await axios.get("http://localhost:3000/products/list")

            if(response.status == 200){
                setProducts(response.data.products)
            }
        }
        catch(error){
            console.log(error)
        }
    }

    const setUserCartAfterRefresh =async (token) =>{
        const response = await axios.post("http://localhost:3000/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData)
    }

    useEffect(()=>{
        getProducts()
    },[])

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'));
            setUserCartAfterRefresh(localStorage.getItem('token'))
        }
    },[])
    const value={
        products,
        currency,
        delivery_fee,
        searched,setSearched,
        showBar,setShowBar,
        cartItems,setCartItems,
        addItemstoCart,cartItemsCount,updateCartItems,
        cartTotal,
        token,setToken

    }

    
    return (
        <shopDataContext.Provider value={value}>
            {children}
        </shopDataContext.Provider>
    )
}
export default ShopProvider