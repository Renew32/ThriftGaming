
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, useSearchParams } from 'react-router-dom';
import products from '../data/products.json';
import ProductGrid    from '../components/ProductGrid';
import FilterSidebar  from '../components/FilterSidebar';

export default function Category() {

    const { brand } = useParams();
    const [params, setParams] = useSearchParams();


    const all = products.filter(
        p => p.brand.toLowerCase() === brand.toLowerCase()
    );


    const priceStats = all.reduce(
        (acc, p) => ({
            min : Math.min(acc.min, p.price),
            max : Math.max(acc.max, p.price)
        }),
        { min: Infinity, max: -Infinity }
    );


    const selType = new Set((params.get('type') || '').split(',').filter(Boolean));

    const selPrice = {
        min: Number(params.get('min')) || priceStats.min,
        max: Number(params.get('max')) || priceStats.max
    };

    const selected = { Type: selType, Prix: selPrice };


    const typeCounts = {};
    all.forEach(p => { typeCounts[p.type] = (typeCounts[p.type] || 0) + 1; });

    const groups = {
        Type: Object.entries(typeCounts).map(([value, count]) => ({
            value,
            label: value.charAt(0).toUpperCase() + value.slice(1),
            count
        })),
        Prix: priceStats
    };


    const visible = all.filter(p => {
        // type
        if (selType.size && !selType.has(p.type)) return false;
        // prix
        if (p.price < selPrice.min || p.price > selPrice.max) return false;
        return true;
    });


    const onFilterChange = next => {
        /* -- type -- */
        const typeStr = [...next.Type].join(',');
        typeStr ? params.set('type', typeStr) : params.delete('type');

        /* -- prix -- */
        params.set('min', next.Prix.min);
        params.set('max', next.Prix.max);

        setParams(params, { replace: true });
    };


    return (
        <Container fluid className="py-4">
            <Row>
                {/* -- Sidebar filtres --*/}
                <Col lg={3} className="mb-4">
                    <FilterSidebar
                        groups={groups}
                        selected={selected}
                        onChange={onFilterChange}
                    />
                </Col>

                {/* -- Grille produits -- */}
                <Col lg={9}>
                    <h4 className="mb-4 text-capitalize">
                        {brand}{' '}
                        <small className="text-muted">({visible.length})</small>
                    </h4>

                    <ProductGrid products={visible} />
                </Col>
            </Row>
        </Container>
    );
}