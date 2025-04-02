import { SetupUser } from "@/actions/billing/setupUser";

type Props = {};

const SetupPage = async (props: Props) => {
  
  return await SetupUser();
};

export default SetupPage;
