import CourseBox from "@/components/course-box";

export default function Course() {
  return (
    <main className="">
      {/* Ellipses background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#b3b5fd] opacity-50 rounded-full filter blur-3xl z-0"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#b3b5fd] opacity-50 rounded-full filter blur-3xl z-0"></div>
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#b3b5fd] opacity-50 rounded-full filter blur-3xl z-0"></div>

      <div className="relative z-10 mx-20">
        <CourseBox video="https://www.youtube.com/embed/zOjov-2OZ0E?si=VQUuhoW331wAefoM" />
      </div>
    </main>
  );
}
