import styled from 'styled-components';
import { h1, searchResult } from 'Styles/common';

const SearchResult = ({ correct }) => {
	return (
		<S.Wrapper>
			<h1>검색결과</h1>
			<div>{correct}</div>
		</S.Wrapper>
	);
};

export default SearchResult;

const Wrapper = styled.div`
	& > h1 {
		${h1}
	}
	margin: 20px 0;

	& > div {
		${searchResult}
	}
`;

const S = {
	Wrapper,
};
