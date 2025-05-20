import Sidebar from "../components/sidebar/Sidebar";
import ProfileForm from "../components/profileForm/ProfileForm";
import { useTranslation } from "react-i18next";

const ProfilePage = () => {
  const { t } = useTranslation("profileuser");

  return (
    <div className="flex min-h-screen mt-10 p-10">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 shadow-md m-4 rounded-xl bg-gray-100">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-gray-800">
          {t("profileOverviewTitle")}
        </h2>

        <section className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4 text-gray-600">
            {t("generalInfoTitle")}
          </h3>
          <ProfileForm />
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
