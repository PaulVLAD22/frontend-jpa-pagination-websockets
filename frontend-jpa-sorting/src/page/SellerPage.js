import React, { useEffect, useState } from "react";
import { configureApi } from "../helper/apiHelper";
import Pagination from "../feature/Pagination";

const { retrieve, create, remove, update } = configureApi("api/v1/sellers/");

const SellerPage = (props) => {
  const [sellersPageData, setSellersPageData] = React.useState();

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Perform any additional logic or data fetching here based on the new page number
  };

  useEffect(() => {
    retrieve(`sort=id&sort=desc&page=${currentPage}&size=${3}`).then((res) => {
      setSellersPageData(res);
    });
  }, [currentPage]);

  return (
    <>
      <div>
        {sellersPageData?.data.map((el) => (
          <div key={el.id}>{el.name}</div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={sellersPageData?.totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default SellerPage;
