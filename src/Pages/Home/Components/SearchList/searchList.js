import styled from 'styled-components';

const SearchList = ({ result, focusIdx, content }) => {
	return (
		<>
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
