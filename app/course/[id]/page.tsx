"use client";

type Props = {
  params: {
    id: number;
  };
};

const CoursePage = ({ params: { id } }: Props) => {
  return <p>course {id}</p>;
};

export default CoursePage;
