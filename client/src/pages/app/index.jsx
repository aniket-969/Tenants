import { ToastContainer } from "react-toastify";
import { AppProvider } from "./provider";
import { AppRouter } from "./router";
import 'react-toastify/dist/ReactToastify.css'

export const App = () => {
  return (
    <AppProvider>
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </AppProvider>
  );
};
