import { useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "@/store/auth/axiosConfig";
import { useUniversityStore } from "@/store/univer/useUniversityStore";
import Loader from "@/components/organisms/loader/Loader";
import StudentDirectionPage from "@/components/organisms/studentsdirection/StudentsDirections";

export default function Info() {
  const { id } = useParams<{ id: string }>();

  const { university, setUniversity } = useUniversityStore();

  useEffect(() => {
    if (!id) return;
    if (university) return; // уже есть — не дергаем API

    api.get(`/ru/api/auth/universities/${id}`).then((res) => {
      setUniversity(res.data);
    });
  }, [id, university, setUniversity]);

  if (!university) {
    return <Loader />;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 mt-20 space-y-6">
      <h1 className="text-3xl font-bold">{university.title}</h1>

      <StudentDirectionPage />
    </div>
  );
}
