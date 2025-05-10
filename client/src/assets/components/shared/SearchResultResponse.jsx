import React from "react";

const GigCard = ({ item }) => {
  return (
    <div className="w-[324px] flex flex-col rounded-lg overflow-hidden border border-gray-200 shadow-md transition hover:shadow-lg">
      <img src={item.cover} alt="Gig" className="w-full h-[200px] object-cover" />
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={item.userImg || "/img/noavatar.jpg"}
            alt="User"
          />
          <span className="text-sm font-medium">{item.username}</span>
        </div>
        <p className="text-gray-700 text-sm">{item.shortDesc}</p>
        <div className="flex items-center gap-1 text-yellow-500 text-sm font-semibold">
          <span>★</span>
          <span>{item.star?.toFixed(1)}</span>
        </div>
      </div>
      <hr className="mx-4 border-gray-200" />
      <div className="flex justify-between items-center p-4 text-sm font-medium">
        <span className="text-gray-600">STARTING AT</span>
        <span className="text-green-600">${item.price}</span>
      </div>
    </div>
  );
};

const SearchResultResponse = () => {
  const gigList = [
    {
      _id: "1",
      cover: "https://source.unsplash.com/400x300/?web",
      desc: "Professional website design",
      shortDesc: "Beautiful responsive UI",
      star: 4.9,
      username: "yasirDev",
      price: 150,
      userImg: "https://i.pravatar.cc/100?img=1",
    },
    {
      _id: "2",
      cover: "https://source.unsplash.com/400x300/?coding",
      desc: "Full-stack app development",
      shortDesc: "MERN stack solutions",
      star: 5.0,
      username: "devAli",
      price: 220,
      userImg: "https://i.pravatar.cc/100?img=2",
    },
    {
      _id: "3",
      cover: "https://source.unsplash.com/400x300/?marketing",
      desc: "Boost your brand online",
      shortDesc: "SEO & marketing",
      star: 4.7,
      username: "seoExpert",
      price: 90,
      userImg: "https://i.pravatar.cc/100?img=3",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      <h2 className="text-3xl font-bold mb-8 text-center">Gigs</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {gigList.map((gig) => (
          <GigCard key={gig._id} item={gig} />
        ))}
      </div>
    </div>
  );
};

export default SearchResultResponse;
