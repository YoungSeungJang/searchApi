const SearchList = ({ result }) => {
	return (
		<>
			{result && result.map((item)=><div>{item}</div>)}
		</>
	);
};

export default SearchList;
