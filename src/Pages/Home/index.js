import Api from 'Apis/searchapi';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchList from './Components/SearchList/searchList';

const HomePage = () => {
	const [content, setContent] = useState();
	const [result, setResult] = useState();

	const fetchContent = async () => {
		const res = await Api.SearchApi(content);
		setResult(res.data);
	};

	const onChangeContent = e => {
		setContent(e.target.value);
	};

	useEffect(() => {
		if (!content) return setResult(null);
		fetchContent();
	}, [content]);

	return (
		<div>
			<S.Wrapper>
				<S.Input onChange={onChangeContent} />
				<button>X</button>
				<button>검색</button>
			</S.Wrapper>
			<SearchList result={result} />
		</div>
	);
};

export default HomePage;

const Wrapper = styled.div`
	border: 1px solid red;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Input = styled.input`
	font-size: 2rem;
	margin: 25px;
`;

const S = {
	Wrapper,
	Input,
};
