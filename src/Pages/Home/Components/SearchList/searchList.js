import styled from 'styled-components';
import { h1, searchResult } from 'Styles/common';

const SearchList = ({ result, focusIdx, content }) => {
	return (
		<S.Wrapper>
			<h1>연관검색</h1>
			{result &&
				result.map((item, idx) => (
					<S.List focus={focusIdx === idx}>
						{item.includes(content) ? (
							<>
								{item.split(content)[0]}
								<span style={{ color: 'red', fontWeight: 'bold' }}>
									{content}
								</span>
								{item.split(content)[1]}
							</>
						) : (
							<>{item}</>
						)}
					</S.List>
				))}
		</S.Wrapper>
	);
};

export default SearchList;

const Wrapper = styled.div`
	& > h1 {
		${h1}
	}
`;

const List = styled.div`
	background-color: ${({ focus }) => (focus ? '#d9d9d9' : 'white')};
	${searchResult}
`;

const S = {
	Wrapper,
	List,
};
