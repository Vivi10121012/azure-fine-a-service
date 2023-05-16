import React, { useState } from 'react';
import {
    Input,
    InputGroup,
    Table,
    Button,
    DOMHelper,
    Stack,
    SelectPicker,
    IconButton,
    Rate
} from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import { mockUsers } from '../../data/mock';
import { NameCell } from '../cells';
import CollaspedOutlineIcon from '@rsuite/icons/CollaspedOutline';
import ExpandOutlineIcon from '@rsuite/icons/ExpandOutline';
import { useNavigate } from "react-router-dom";

// 数据是假的，随机生成的，需要自己导入
const data = mockUsers(20);

const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;


//可展开
const rowKey = 'id';

const ExpandCell = ({ rowData, dataKey, expandedRowKeys, onChange, ...props }) => (
    <Cell {...props} style={{ padding: 5 }}>
        <IconButton
            appearance="subtle"
            onClick={() => {
                onChange(rowData);
            }}
            icon={
                expandedRowKeys.some(key => key === rowData[rowKey]) ? (
                    <CollaspedOutlineIcon />
                ) : (
                    <ExpandOutlineIcon />
                )
            }
        />
    </Cell>
);
//展开的内容
const renderRowExpanded = rowData => {
    return (
        <div>
            <p>Type: {rowData.jobType}</p>
            <p>Description: {rowData.street}</p>
        </div>
    );
};

//获取rating星星,之后用于筛选框
const ratingList = Array.from({ length: 5 }).map((_, index) => {
    return {
        value: index + 1,
        label: Array.from({ length: index + 1 })
            .map(() => '⭐️')
            .join('')
    };
});


const AdminReviewTable = () => {
    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [rating, setRating] = useState(null);;
    //可展开
    const [expandedRowKeys, setExpandedRowKeys] = React.useState([]);

    const navigate = useNavigate();
    const handleClick = (rowData) => {
        console.log(rowData.id);
    };

    const handleExpanded = (rowData, dataKey) => {
        let open = false;
        const nextExpandedRowKeys = [];

        expandedRowKeys.forEach(key => {
            if (key === rowData[rowKey]) {
                open = true;
            } else {
                nextExpandedRowKeys.push(key);
            }
        });

        if (!open) {
            nextExpandedRowKeys.push(rowData[rowKey]);
        }

        setExpandedRowKeys(nextExpandedRowKeys);
    };


    const handleSortColumn = (sortColumn, sortType) => {
        setSortColumn(sortColumn);
        setSortType(sortType);
    };

    const filteredData = () => {
        const filtered = data.filter(item => {
            if (!item.name.includes(searchKeyword)) {//搜索 这里搜索的是name
                return false;
            }

            if (rating && item.rating !== rating) {
                return false;
            }

            return true;
        });

        if (sortColumn && sortType) {
            return filtered.sort((a, b) => {
                let x = a[sortColumn];
                let y = b[sortColumn];

                if (typeof x === 'string') {
                    x = x.charCodeAt(0);
                }
                if (typeof y === 'string') {
                    y = y.charCodeAt(0);
                }

                if (sortType === 'asc') {
                    return x - y;
                } else {
                    return y - x;
                }
            });
        }
        return filtered;
    };

    return (
        <>
            <Stack className="table-toolbar" style={{ padding: '10px', background: '#fff', borderRadius: '4px 4px 0 0', justifyContent: 'right' }}>

                {/* rate筛选 */}
                <Stack spacing={6}>
                    <SelectPicker
                        label="Rating"
                        data={ratingList}
                        value={rating}
                        onChange={setRating}
                    />
                    {/* 搜索框 */}
                    <InputGroup inside>
                        <Input placeholder="Search" value={searchKeyword} onChange={setSearchKeyword} />
                        <InputGroup.Addon>
                            <SearchIcon />
                        </InputGroup.Addon>
                    </InputGroup>
                </Stack>
            </Stack>

            <Table
                height={Math.max(getHeight(window) - 200, 400)}
                data={filteredData()}
                sortColumn={sortColumn}
                sortType={sortType}
                onSortColumn={handleSortColumn}
                rowKey={rowKey}
                expandedRowKeys={expandedRowKeys}
                onRowClick={data => {
                    console.log(data);
                }}
                renderRowExpanded={renderRowExpanded}
            >
                <Column width={60} align="center" fixed sortable>
                    <HeaderCell>Username</HeaderCell>
                    <Cell dataKey="id" />
                </Column>

                <Column width={70} align="center">
                    <HeaderCell>#</HeaderCell>
                    <ExpandCell dataKey="id" expandedRowKeys={expandedRowKeys} onChange={handleExpanded} />
                </Column>

                {/* <Column minWidth={100} flexGrow={1} sortable> */}
                <Column width={300} sortable>
                    <HeaderCell>Service Name</HeaderCell>
                    <NameCell dataKey="name" />
                </Column>

                <Column width={150} sortable>
                    <HeaderCell>Service Provider</HeaderCell>
                    <Cell dataKey="jobType" />
                </Column>

                <Column width={100} sortable>
                    <HeaderCell>Rating</HeaderCell>
                    <Cell dataKey="rating">
                        {rowData =>
                            Array.from({ length: rowData.rating }).map((_, i) => <span key={i}>⭐️</span>)
                        }
                    </Cell>
                </Column>

                <Column width={150} sortable  flexGrow={1}>
                    <HeaderCell>Content</HeaderCell>
                    <Cell dataKey="description" />
                </Column>

                <Column width={100}>
                    <HeaderCell>operations</HeaderCell>
                    <Cell style={{ padding: '5px' }}>
                        {rowData => (
                            <Button color="red" appearance="ghost" onClick={() => handleClick(rowData)}>
                                DELETE
                            </Button>
                        )}
                    </Cell>
                </Column>
            </Table>
        </>
    );
};

export default AdminReviewTable;