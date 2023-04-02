import styled from 'styled-components';

const RecentSearch = ({ recentKeyword }) => {
	return (
		<S.Wrapper>
			<h3>최근검색어</h3>
			{recentKeyword?.map(keyword => (
				<div>{keyword}</div>
			))}
		</S.Wrapper>
	);
};

export default RecentSearch;

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	font-size: 1rem;
	margin-bottom: 20px;
	& > h3 {
		font-weight: bold;
		background-color: #e9e9e9;
		border-radius: 20px;
		padding: 10px;
	}
	& > * {
		margin-right: 30px;
		background-color: #e9e9e9;
		border-radius: 20px;
		padding: 10px;
		margin-top: 10px;
	}
`;

const S = {
	Wrapper,
};
