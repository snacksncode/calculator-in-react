interface Props {
  topValue: string | null;
  mainValue: string | null;
}

export const Display = ({ topValue, mainValue }: Props) => {
  return (
    <div>
      <div className="text-base min-h-[24px] text-blue-400 font-medium text-right opacity-80">
        {topValue == null ? null : `${topValue}  =`}
      </div>
      <div className="relative isolate">
        <div className="text-4xl min-h-[80px] rounded mt-2 px-3 py-5 text-right font-semibold bg-gradient-to-r from-sky-300 to-blue-300">
          {mainValue ?? 0}
        </div>
        <div className="bg-blue-200 rounded -z-10 scale-95 absolute w-full h-full top-2 left-0"></div>
        <div className="bg-blue-100 rounded -z-20 scale-90 absolute w-full h-full top-4 left-0"></div>
      </div>
    </div>
  );
};
