import { Box } from "@mui/system";
import { MultiSelectBox, MultiSelectBoxItem } from "@tremor/react";
import React from "react";
import { flexCenter } from "../styles/globalStyle";

const MultiSelect = (props) => {
  const {
    data1,
    data2,
    key1,
    key2,
    firstNames,
    setFirstNames,
    setSecondNames,
  } = props;
  // There might be same purchases data .To prevent this , we can use Set to let them be unique.
  const uniqueFirstNames = new Set(data1?.map((item) => item[key1]));
  const uniqueSecondNames = new Set(
    data1 !== data2
      ? data2
          ?.filter((item) => firstNames?.includes(item[key2]))
          .map((item) => item[key1])
      : data2
          ?.filter((item) => firstNames?.includes(item[key1]))
          .map((item) => item[key2])
  );
  return (
    <Box sx={flexCenter} mt={3}>
      <MultiSelectBox
        handleSelect={(item) => setFirstNames(item)}
        placeholder={`Select ${key1}`}
      >
        {[...uniqueFirstNames]?.map((item) => (
          <MultiSelectBoxItem key={item} value={item} text={item} />
        ))}
      </MultiSelectBox>

      <MultiSelectBox
        handleSelect={(item) => setSecondNames(item)}
        placeholder={`Select ${key2}`}
      >
        {[...uniqueSecondNames]?.map((item) => (
          <MultiSelectBoxItem key={item} value={item} text={item} />
        ))}
      </MultiSelectBox>
    </Box>
  );
};

export default MultiSelect;
