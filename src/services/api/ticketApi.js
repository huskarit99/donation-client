import Axios from "axios";

import ticketResponseEnum from "../../utils/enums/ticketResponseEnum";
const ticketApi = () => {
  // const ENDPOINT = "http://localhost:5000/api/ticket-controller/";
  const ENDPOINT =
    "https://lucky-lottery-server.herokuapp.com/api/ticket-controller/";
  Axios.defaults.withCredentials = true;

  return {
    payment: async (id, isPaid) => {
      const PATH = ENDPOINT + "order/payment";
      try {
        await Axios({
          method: "put",
          url: PATH,
          data: {
            id: id,
            isPaid: !isPaid,
          },
        });
        return {
          isSuccess: true,
        };
      } catch (error) {
        return {
          isSuccess: false,
        };
      }
    },
    exportTopVip: async () => {
      const PATH = ENDPOINT + "export/top-vip";
      await Axios({
        method: "get",
        url: PATH,
        responseType: "blob",
      }).then(({ data }) => {
        console.log(data);
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Summary.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
    },
    deleteOrder: async (id) => {
      const PATH = ENDPOINT + "order?id=" + id;
      try {
        await Axios({
          method: "delete",
          url: PATH,
        });
        return {
          isSuccess: true,
        };
      } catch (error) {
        return {
          isSuccess: false,
        };
      }
    },
    login: async (password) => {
      const path = ENDPOINT + "auth/user";
      try {
        await Axios({
          method: "post",
          url: path,
          data: {
            password: password,
          },
        });
        return {
          isSuccess: true,
        };
      } catch (error) {
        return {
          isSuccess: false,
        };
      }
    },
    updateGender: async ({ id, gender }) => {
      const path = ENDPOINT + "order/gender";
      try {
        await Axios({
          method: "put",
          url: path,
          data: {
            id: id,
            gender: gender,
          },
        });
        return {
          isSuccess: true,
        };
      } catch (error) {
        return {
          isSuccess: false,
        };
      }
    },
    updateName: async ({ id, name }) => {
      const path = ENDPOINT + "order/name";
      try {
        await Axios({
          method: "put",
          url: path,
          data: {
            id: id,
            name: name,
          },
        });
        return {
          isSuccess: true,
        };
      } catch (error) {
        return {
          isSuccess: false,
        };
      }
    },
    getTopVip: async () => {
      const path = ENDPOINT + "top-vip";
      try {
        const result = await Axios({
          method: "get",
          url: path,
        });
        return {
          isSuccess: true,
          data: result.data.topVip,
        };
      } catch (error) {
        return {
          isSuccess: false,
        };
      }
    },
    authToken: async () => {
      const PATH = ENDPOINT + "auth/token";
      try {
        await Axios({
          method: "post",
          url: PATH,
        });
        return {
          isSuccess: true,
        };
      } catch (error) {
        return {
          isSuccess: false,
        };
      }
    },
    getOrderById: async (id) => {
      const PATH = ENDPOINT + "order/" + id;
      try {
        const res = await Axios({
          method: "get",
          url: PATH,
        });
        return {
          isSuccess: true,
          order: res.data.order,
        };
      } catch (error) {
        return {
          isSuccess: false,
        };
      }
    },
    getTicketByTicketNumber: async (ticketNumber) => {
      const PATH = ENDPOINT + "ticket/" + ticketNumber;
      try {
        const res = await Axios({
          method: "get",
          url: PATH,
        });
        return {
          isSuccess: true,
          ticket: res.data.ticket,
        };
      } catch (error) {
        return {
          isSuccess: false,
        };
      }
    },
    checkTicketByTicketNumber: async (ticketNumber) => {
      let message = "";
      const PATH = ENDPOINT + "check-ticket/" + ticketNumber;
      try {
        await Axios({
          method: "get",
          url: PATH,
        });
        return {
          isSuccess: true,
        };
      } catch (error) {
        if (!error || !error.response || !error.response.data)
          return {
            isSuccess: false,
            message: "Server Error !!!",
          };
        switch (error.response.data.code) {
          case ticketResponseEnum.TICKET_IS_EMPTY: {
            message = "Vé không được trống !!!";
            break;
          }
          case ticketResponseEnum.TICKET_INVALID: {
            message = "Vé không hợp lệ !!!";
            break;
          }
          case ticketResponseEnum.TICKET_UNAVAILABLE: {
            message = "Vé này đã có người đặt !!!";
            break;
          }
          case ticketResponseEnum.SERVER_ERROR: {
            message = "Server Error !!!!";
            break;
          }
          default: {
            message = "Server Error !!!!";
          }
        }
        return {
          isSuccess: false,
          message: message,
        };
      }
    },
    getOrders: async () => {
      const PATH = ENDPOINT + "orders";
      try {
        const res = await Axios({
          method: "get",
          url: PATH,
        });
        return {
          isSuccess: true,
          orders: res.data.orders,
          numberOfTicketsAreOrdered: res.data.numberOfTicketsAreOrdered,
          numberOfTicketsArePaid: res.data.numberOfTicketsArePaid,
        };
      } catch (error) {
        return {
          isSuccess: false,
        };
      }
    },
    getAll: async () => {
      const PATH = ENDPOINT + "tickets";
      try {
        const res = await Axios({
          method: "get",
          url: PATH,
        });
        return {
          isSuccess: true,
          tickets: res.data.tickets,
        };
      } catch (error) {
        return {
          isSuccess: false,
        };
      }
    },
    getManyByPage: async (page) => {
      const PATH = ENDPOINT + "tickets?page=" + page;
      try {
        const res = await Axios({
          method: "get",
          url: PATH,
        });
        return {
          isSuccess: true,
          count: res.data.count,
          tickets: res.data.tickets,
        };
      } catch (error) {
        return {
          isSuccess: false,
        };
      }
    },
    remove: async (ticketNumber) => {
      const PATH = ENDPOINT + "ticket?ticketNumber=" + ticketNumber;
      try {
        await Axios({
          method: "delete",
          url: PATH,
        });
        return {
          isSuccess: true,
        };
      } catch (error) {
        return {
          isSuccess: false,
        };
      }
    },
    order: async (email, name, phoneNumber, tickets) => {
      const PATH = ENDPOINT + "order";
      let message = "";
      try {
        const result = await Axios({
          method: "put",
          url: PATH,
          data: {
            email: email ? email : null,
            name: name ? name : null,
            phoneNumber: phoneNumber ? phoneNumber : null,
            tickets: tickets ? tickets : [],
          },
        });
        return {
          isSuccess: true,
          orderId: result.data.orderId,
          bookFailed: result.data.bookFailed,
          bookSuccessfully: result.data.bookSuccessfully,
        };
      } catch (error) {
        if (!error || !error.response || !error.response.data)
          return {
            isSuccess: false,
            message: "Server Error !!!",
          };
        switch (error.response.data.code) {
          case ticketResponseEnum.EMAIL_IS_EMPTY: {
            message = "Bạn chưa điền Email !!!";
            break;
          }
          case ticketResponseEnum.PHONE_NUMBER_IS_EMPTY: {
            message = "Bạn chưa điền thông tin số điện thoại !!!";
            break;
          }
          case ticketResponseEnum.TICKETS_ARE_EMPTY: {
            message = "Bạn chưa chọn vé !!!";
            break;
          }
          case ticketResponseEnum.EMAIL_IS_INVALID: {
            message = "Email không hợp lệ !!!";
            break;
          }
          case ticketResponseEnum.NAME_IS_EMPTY: {
            message = "Bạn chưa điền tên !!!";
            break;
          }
          case ticketResponseEnum.TICKET_INVALID: {
            message = "Vé không hợp lệ !!!";
            break;
          }
          case ticketResponseEnum.TICKET_UNAVAILABLE: {
            message = "Vé này đã có người đặt !!!";
            break;
          }
          case ticketResponseEnum.SERVER_ERROR: {
            message = "Server Error !!!!";
            break;
          }
          default: {
            message = "Server Error !!!!";
          }
        }
        return {
          isSuccess: false,
          message: message,
        };
      }
    },
  };
};

export default ticketApi;
