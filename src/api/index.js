import axios from "axios";

const client = axios.create({
  baseURL: "https://api.thecatapi.com/v1/",
});

const getAllCategories = async () => {
  console.log(await client.get(`/categories`));
  const { data } = await client.get(`/categories`);
  return data;
};

const getCategoryDetail = async (id, page = 1, limit = 10) => {
  const { data } = await client.get(
    `/images/search?limit=${limit}&page=${page}&category_ids=${id}`
  );
  return data;
};

export { getAllCategories, getCategoryDetail };
