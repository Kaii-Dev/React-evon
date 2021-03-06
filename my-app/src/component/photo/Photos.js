import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const getPhotos = async (page) => {
  //thằng getphotos khi sử dụng axios thì nó đã trở thành promis nên có thể xài then
  try {
    const response = await axios.get(
      `https://picsum.photos/v2/list?page=${page}&limit=8`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const Photos = () => {
  const handleLoadMore = useRef({});
  handleLoadMore.current = async () => {
    const images = await getPhotos(nextPage);
    //ở đây sử dụng spread operator để nối giá trị cũ và giá trị mới
    const newPhotos = [...randomPhotos, ...images];
    setRandomPhotos(newPhotos);
    setNextPage(nextPage + 1);
    console.log("new photos page: ", newPhotos);
  };

  const [randomPhotos, setRandomPhotos] = useState([]);
  const [nextPage, setNextPage] = useState(1);

  useEffect(() => {
    handleLoadMore.current();
  }, [handleLoadMore]);

  return (
    <div>
      <div className="grid grid-cols-4 gap-5 p-5">
        {randomPhotos.length > 0 &&
          randomPhotos.map((item, index) => (
            <div
              key={item.download_url}
              className="p-3 bg-white shadow-md rounded-lg h-[200px]"
            >
              <img
                src={item.download_url}
                alt={item.author}
                className="w-full h-full rounded-lg object-cover"
              />
            </div>
          ))}
      </div>
      <div className="text-center">
        <button
          className="inline-block  px-8 py-4 bg-purple-600 text-white justify-center"
          onClick={handleLoadMore.current}
        >
          Load more
        </button>
      </div>
    </div>
  );
};

export default Photos;
