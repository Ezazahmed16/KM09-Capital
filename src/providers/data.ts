import { BACKEND_BASE_URL } from "@/constants"
import { createDataProvider, CreateDataProviderOptions } from "@refinedev/rest"
import { ListResponse } from "@/types"

const mapResourceEndpoint = ({ resource, id }: { resource: string; id?: any }) => {
  let endpoint = resource;
  if (resource === "Members") {
    endpoint = "allMembers";
  }

  if (id) {
    return `${endpoint}/${id}`;
  }
  return endpoint;
};

const mapSingleResponse = async (response: any) => {
  const payload = await response.json();
  return payload.data ?? payload;
};

const options: CreateDataProviderOptions = {
  getList: {
    getEndpoint: mapResourceEndpoint,
    buildQueryParams: async (params) => {
      const { pagination, filters, resource } = params;
      const query: Record<string, any> = {};

      if (pagination) {
        query.page = pagination.currentPage ?? 1;
        query.limit = pagination.pageSize ?? 10;
      }

      if (filters) {
        for (const filter of filters) {
          if ("field" in filter) {
            if (filter.field === "trxNo") {
              query.search = filter.value;
            } else if (filter.field === "paymentMethod") {
              query.paymentMethods = filter.value;
            } else if (filter.field === "name") {
              query.search = filter.value;
            } else if (filter.field === "status") {
              query.status = filter.value;
            }
          }
        }
      }

      return query;
    },
    mapResponse: async (response) => {
      const payload: ListResponse = await response.json();

      return payload.data ?? [];
    },
    getTotalCount: async (response) => {
      const payload: ListResponse = await response.json();
      return payload.pagination?.total ?? payload.data?.length ?? 0;
    }
  },
  getOne: {
    getEndpoint: mapResourceEndpoint,
    mapResponse: mapSingleResponse,
  },
  create: {
    getEndpoint: mapResourceEndpoint,
    mapResponse: mapSingleResponse,
  },
  update: {
    getEndpoint: mapResourceEndpoint,
    mapResponse: mapSingleResponse,
  },
  deleteOne: {
    getEndpoint: mapResourceEndpoint,
  }
}

const { dataProvider } = createDataProvider(BACKEND_BASE_URL, options, {
  credentials: "include",
});

export { dataProvider };