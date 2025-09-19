export default function loading() {
  return (
    <main className="mt-6 min-h-screen">
      <div className="w-full flex justify-center items-center flex-col gap-2">
        <div className="bg-secondary anim-bg w-[100px] h-[100px] !rounded-[50%]" />
        <div className="bg-secondary anim-bg w-[120px] h-4" />
        <div className="bg-secondary anim-bg w-[100px] h-4" />
      </div>
      <div className="flex justify-center items-center gap-2 mt-4">
        <div className="bg-secondary anim-bg w-[80px] h-4" />
        <div className="bg-secondary anim-bg w-[80px] h-4" />
        <div className="bg-secondary anim-bg w-[80px] h-4" />
      </div>
      <div>
        <div className="bg-secondary anim-bg w-full h-6 mt-6" />
        <div className="bg-secondary anim-bg w-full h-6 mt-4" />
        <div className="bg-secondary anim-bg w-full h-6 mt-4" />
        <div className="bg-secondary anim-bg w-full h-6 mt-4" />
        <div className="bg-secondary anim-bg w-full h-6 mt-4" />
      </div>
    </main>
  );
}
