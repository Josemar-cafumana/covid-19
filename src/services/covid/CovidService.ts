import api from "../api";



const findAll = async () => {
  const { data } = await api.get(`countries`);

  return data;
};



const CovidService = {
  findAll,
};

export default CovidService;