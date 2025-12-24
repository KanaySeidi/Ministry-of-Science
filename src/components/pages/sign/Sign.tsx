import gerb from "@/assets/img/gerb.png";
import Form from "@/components/organisms/form/Form";

const Sign = () => {
  return (
    <>
      <div className="w-screen h-screen bg-sinii">
        <div className="h-full flex items-center justify-center gap-10">
          <div className="flex flex-col items-center gap-5">
            <img src={gerb} alt="" width={200} className="" />
            <h1 className="text-white text-2xl text-center">
              Министерство Науки, Высшего Образования <br /> и Инноваций
              Кыргызской Республики
            </h1>
          </div>
          <div className="w-px h-72 bg-white/50"></div>
          <div>
            <Form />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sign;
