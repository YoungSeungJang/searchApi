import styled from 'styled-components';

const SearchList = ({ result, focusIdx }) => {
	return (
		<>
			<h1>연관검색</h1>
			{result &&
				result.map((item, idx) => (
					<S.List focus={focusIdx === idx}>{item}</S.List>
				))}
		</>
	);
};

export default SearchList;

const List = styled.div`
	background-color: ${({ focus }) => (focus ? '#d9d9d9' : 'white')};
`;

const S = {
	List,
};
