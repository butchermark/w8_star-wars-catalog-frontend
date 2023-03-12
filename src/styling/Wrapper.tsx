import styled from "styled-components";

export const Wrapper = styled.div`+
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
width: 250px;
height: 150px;
color: white;
transition:all 0.3s ease-in-out;
:hover {
    background-color: yellow;
}
:hover .p-name {
    color: black;
    transition:all 0.3s ease-in-out;
}
:hover .p-data {
    color: black;
    transition:all 0.3s ease-in-out;
}

.p-data{
    margin:0;
    padding:0;
    font-size:10px;
    text-align:center;
}
.p-name{
    margin:0;
    padding:0;
    font-size:20px;
    text-align:center;
}
`;
