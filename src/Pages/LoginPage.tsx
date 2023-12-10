import { LoginComponent } from "../Components/Login/LoginComponent";
import { OuterLayout } from "../HOC/OuterLayout";

export const LoginPage = () => {
  return <OuterLayout children={<LoginComponent />}></OuterLayout>;
};
