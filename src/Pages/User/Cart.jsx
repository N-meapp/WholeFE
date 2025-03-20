import { useEffect, useState } from "react";
import { cart } from "../../constants/cards";
import CartProducts from "../../Layout/User/CartProducts";
import CartpriceDetailBox from "../../Layout/User/CartPriceDetailBox";
import { getCart } from "../../api/productApi";
import { useSelector } from "react-redux";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import EmptyCart from "../../Components/EmptyCart";

export default function Cart() {
  const [bottomDifference, setBottomDifference] = useState();
  const user = useSelector((state) => state.user.user);
  const [cartItems, setCartItems] = useState();
  // const [itemsArray,setItemsArray] = useState([]);
  const [countPriceArray, setCountPriceArray] = useState();
  const [isTriggered, setIsTriggered] = useState();
  const [isEmpty, setIsEmpty] = useState();
  const [isDeleted,setIsDeleted] = useState();

  useEffect(() => {
    getCart(setCartItems, user.token).then((res) => {
      
      if (!res) {
        console.log(res, "ressponseessss");
        setIsEmpty(true); 
        handleCount(res);
      }else{
        handleCount(res);
      }

    });
  }, [isDeleted]);

  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });

  },[])

  const handleCount = (arr) => {
    console.log(arr,'arrrrrrrrrr');
    
    const tempArray = [];
    for (let i = 0; i < arr.length; i++) {
      const tempObj = {};
      console.log(arr[i], "boooooooooooooooooooo");
      tempObj.id = arr[i].product_id;
      tempObj.name = arr[i].product_name;
      tempObj.count = arr[i].total_count;
      tempObj.price = findPrice(arr[i]);
      tempObj.stock = arr[i].product_stock;

      tempArray.push(tempObj);
    }

    setCountPriceArray(tempArray);
  };

  const findPrice = (item) => {
    console.log("haiiii");

    let tempPrice = 0;
    for (let j = 0; j < item.prize_range.length; j++) {
      if (
        item.prize_range[j].from <= item.total_count &&
        item.total_count <= item.prize_range[j].to
      ) {
        console.log(item.prize_range[j].prize, "hahahaha");
        tempPrice = item.prize_range[j].prize;

        // break;
      } else {
        console.log("podddaaaaa");
      }
    }
    return tempPrice;
  };

  const handleSetArray = (arr) => {
    console.log(arr,'asrrrrr');
    

    setCountPriceArray([...arr]);
  };

  return (
    <>
      {isEmpty ? (
        <div className=" mx-auto h-screen">
        <EmptyCart />
        
       

        </div>
      ) : (
        <div className="w-full md:pt-36 pt-28">
          <div className="w-full md:w-[90%] mx-auto md:px-10 md:pt-10 px-4 pt-2 md:mt-14 mt-2 pb-20 bg-[#bebebe1c] h-auto rounded-xl  md:flex gap-6">
            <CartProducts
              cart={cartItems?.cart_data ? cartItems.cart_data : []}
              setBottomDifference={setBottomDifference}
              countPriceArray={countPriceArray}
              setCountPriceArray={setCountPriceArray}
              handleSetArray={handleSetArray}
              setIsItemDeleted={setIsDeleted}
            />
            <CartpriceDetailBox
              setIsDeleted={setIsDeleted}
              cart={cartItems}
              setCart={setCartItems}
              setIsEmpty={setIsEmpty}
              bottomDifference={bottomDifference}
              countPriceArray={countPriceArray}
              setCountPriceArray={setCountPriceArray}
            />
          </div>
        </div>
      )}
    </>
  );
}
