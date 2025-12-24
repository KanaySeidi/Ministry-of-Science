import gerb from "@/assets/img/gerb.png";
import LanguageSwitcher from "@/components/molecules/LangSwitcher";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="w-full h-24 fixed top-0 left-0  bg-sinii border-b border-white">
        <div className="w-11/12 h-full mx-auto flex justify-between items-center backdrop-blur-md">
          <div className="flex gap-5 h-full items-center">
            <img src={gerb} alt="" className="size-14" />
            <div className="flex flex-col text-white">
              <p>{t("header.line1")}</p>
              <p>{t("header.line2")}</p>
              <p>{t("header.line3")}</p>
            </div>
          </div>

          <div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
