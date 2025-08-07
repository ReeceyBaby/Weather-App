import { SchemeProps } from "../types";

export function Badge({ value }: { value: string; }) {
  let scheme: SchemeProps = -1;

  // Mapping scheme to values
  const textError = ['severe', 'immediate'];
  const textWarning = ['likely', 'expected'];
  const textInfo = ['possible', 'observed', 'moderate', 'past'];
  const textSuccess = ['minor', 'future'];

  if (textError.includes(`${value}`.toLowerCase())) scheme = 0;
  if (textWarning.includes(`${value}`.toLowerCase())) scheme = 1;
  if (textInfo.includes(`${value}`.toLowerCase())) scheme = 2;
  if (textSuccess.includes(`${value}`.toLowerCase())) scheme = 3;

  // Class scheme
  let classScheme = 'bg-[#efefef]';
  
  switch(scheme) {
    case -1:
      break;
    case 0:
      // Error
      classScheme = 'bg-[#f5c6cb]';
      break;
    case 1:
      // Warning
      classScheme = 'bg-[#ffeeba]';
      break;
    case 2:
      // Info
      classScheme = 'bg-[#ffeeba]';
      break;
    case 3:
      // Success
      classScheme = 'bg-[#c3e6cb]';
      break;
  }

  return <span className={`inline-block md:flex justify-center items-center px-3 leading-[1.8rem] text-[10px] uppercase text-[rgba(0,0,0,0.6)] rounded-full font-extrabold ${classScheme}`}>{value}</span>;
}
