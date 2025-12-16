import AnimationContainer from "@/app/components/AnimationContainer";
import ContactForm from "./_components/ContactForm";
export const metadata = {
  title: "ES FITT | Contact",
};
export default function page() {
  return (
    <AnimationContainer>
      <main className="w-full flex justify-center items-center">
        <ContactForm />
      </main>
    </AnimationContainer>
  );
}
