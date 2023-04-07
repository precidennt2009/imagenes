//FUNCTION REACT JSX
function administrar(){
        const elementosadministrar = (
                <ul>
                        <li>Apples</li>
                        <li>Bananas</li>
                        <li>Cherries</li>
                </ul>
        );
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(elementosadministrar);
}