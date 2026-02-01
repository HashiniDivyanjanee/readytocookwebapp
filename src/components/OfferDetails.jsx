import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

export const OfferDetail = () => {
  const { id } = useParams(); 
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    const fetchOffer = async () => {
      const docRef = doc(db, "offers", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setOffer(docSnap.data());
    };
    fetchOffer();
  }, [id]);

  const handleAddToCart = () => {
    console.log("Added to cart:", offer.name);
    alert("Added to cart!");
  };

  if (!offer) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <img src={offer.image} className="w-full rounded-3xl" />
      <h1 className="text-4xl font-black mt-8">{offer.name}</h1>
      <p className="text-xl text-gray-600 mt-4">{offer.description}</p>
      <div className="text-3xl font-bold text-[#FF5C00] mt-6">Rs. {offer.price}</div>
      
      <button 
        onClick={handleAddToCart}
        className="mt-8 bg-[#FF5C00] text-white px-12 py-4 rounded-xl font-bold uppercase"
      >
        Add to Cart
      </button>
    </div>
  );
};