import AnimationContainer from "@/app/components/AnimationContainer";
import { auth } from "@/auth";
import PersonalInfo from "./_components/PersonalInfo";
import UserCredentials from "@/app/src/UserCredentials";
import PasswordInfo from "./_components/PasswordInfo";
import DeleteAccount from "./_components/DeleteAccount";
import DeleteAccountModalContent from "../_components/DeleteAccountModalContent";
export const metadata = {
  title: "ES FITT | Profile Dashboard",
};
export default async function page() {
  const loggedAuth = await auth();
  const user = await UserCredentials(loggedAuth?.user?.id);

  return (
    <AnimationContainer>
      <section>
        <PersonalInfo
          userId={loggedAuth?.user?.id}
          name={user?.name}
          phone={user?.phone}
        />
        <PasswordInfo />

        <DeleteAccount>
          <DeleteAccountModalContent />
        </DeleteAccount>
      </section>
    </AnimationContainer>
  );
}
