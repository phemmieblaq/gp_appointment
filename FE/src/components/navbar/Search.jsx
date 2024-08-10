import React from "react";
import { SearchBar, SearchBarWrapper, SearchIcon, SearchIconWrapper } from "./styled";
import search from "../../assets/images/search.png";

const Search = ({
  style,
  iconStyle,
  inputStyle,
  placeholder = "Search something...",
  onChange,
  value,
  className,
}) => {
  return (
    <SearchBarWrapper style={style} className={className}>
      <SearchIconWrapper>
        <SearchIcon src={search} alt="logo" style={iconStyle} />
      </SearchIconWrapper>
      {value ? (
        <SearchBar placeholder={placeholder} onChange={onChange} style={inputStyle} value={value} />
      ) : (
        <SearchBar placeholder={placeholder} style={inputStyle} onChange={onChange} />
      )}
    </SearchBarWrapper>
  );
};

export default Search;
