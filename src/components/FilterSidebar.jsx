import { useState, useEffect } from 'react';
import { Accordion, Form, Badge } from 'react-bootstrap';
import { Range, getTrackBackground } from 'react-range';

const THUMB = 20;
const TRACK = 6;

export default function FilterSidebar({ groups, selected, onChange }) {
    /* cases à cocher */
    const toggleType = (v) => {
        const s = new Set(selected.Type || []);
        s.has(v) ? s.delete(v) : s.add(v);
        onChange({ ...selected, Type: s });
    };

    /* slider prix */
    const { min, max } = groups.Prix;
    const [val, setVal] = useState([selected.Prix.min, selected.Prix.max]);

    useEffect(() => setVal([selected.Prix.min, selected.Prix.max]), [selected.Prix]);

    const commit = (v) => onChange({ ...selected, Prix: { min: v[0], max: v[1] } });

    return (
        <Accordion alwaysOpen>
            {/* type */}
            <Accordion.Item eventKey="type">
                <Accordion.Header>Type</Accordion.Header>
                <Accordion.Body>
                    {groups.Type.map(({ value, label, count }) => (
                        <Form.Check
                            key={value}
                            type="checkbox"
                            id={value}
                            className="mb-1"
                            checked={selected.Type?.has(value)}
                            onChange={() => toggleType(value)}
                            label={<>{label} <Badge bg="light" text="dark">{count}</Badge></>}
                        />
                    ))}
                </Accordion.Body>
            </Accordion.Item>

            {/* prix */}
            <Accordion.Item eventKey="price">
                <Accordion.Header>Prix</Accordion.Header>
                <Accordion.Body>
                    <p className="text-center fw-semibold mb-1">
                        {val[0]} $ – {val[1] === max ? `${max}+ $` : `${val[1]} $`}
                    </p>

                    <div style={{ width: '85%', margin: '0 auto' }}>
                        <Range
                            min={min}
                            max={max}
                            step={1}
                            values={val}
                            onChange={setVal}
                            onFinalChange={commit}
                            renderTrack={({ props, children }) => (
                                <div
                                    {...props}
                                    style={{
                                        ...props.style,
                                        height: TRACK,
                                        borderRadius: TRACK / 2,
                                        background: getTrackBackground({
                                            values: val,
                                            colors: ['#d0d0d0', '#369e4e', '#d0d0d0'],
                                            min,
                                            max,
                                        }),
                                    }}
                                >
                                    {children}
                                </div>
                            )}
                            renderThumb={({ props }) => (
                                <div
                                    {...props}
                                    style={{
                                        ...props.style,
                                        height: THUMB,
                                        width: THUMB,
                                        borderRadius: '50%',
                                        background: '#369e4e',
                                    }}
                                />
                            )}
                        />
                    </div>

                    <div className="d-flex justify-content-between small mt-2">
                        <span>{min} $</span>
                        <span>{Math.round((min + max) / 2)} $</span>
                        <span>{max}+ $</span>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}