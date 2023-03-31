const RecentSearch = ({ recentKeyword }) => {
	return (
		<>
			<h1>최근검색어</h1>
			{recentKeyword?.map(keyword => (
				<div>{keyword}</div>
			))}
		</>
	);
};

export default RecentSearch;
