$(document).ready(function() {

    var Shops = React.createClass({

        render: function() {

            if(this.props.data) {

                var shopTemplate = this.props.data.map(function(item, index) {
                    return (
                        <div className={"col-lg-4 " + "col-md-6 " + "col-sm-6 " + "col-xs-12"}>
                            <div className="object__component" key={index}>
                                <p className="object__name"><span>Название магазина: </span>{item.Cells.Name}</p>
                                <p className="object__address"><span>Адрес: </span>{item.Cells.Address}</p>
                                <p className="object__district"><span>Округ: </span>{item.Cells.AdmArea}</p>
                                <p className="object__phone"><span>Телефон для связи:</span> {item.Cells.PublicPhone.PublicPhone}</p>
                                <p className="object__work-flow"><span>Рабочие часы:</span> {item.Cells.WorkingHours[0].Hours}</p>
                            </div>
                        </div>
                    )
                });

            } else {

                return (
                    <div>
                        <p className="object__notice">Данные отсутствуют...</p>
                    </div>
                )

            }

            return (
                <div className="shops">
                    {shopTemplate}
                </div>
            );
        }
    });

    var Loading = React.createClass({

        render: function() {
            return (
                <div className="loading">
                    <button onClick={this.props.onClickAddShops} className={"btn " + "btn-default "  + "navbar-btn"}>Загрузить еще...</button>
                </div>
            )
        }

    });

    var App = React.createClass({

        getInitialState: function() {
            return {
                countShowObj: 12, // показываем при инициализации
                myShops: []
            };
        },

        onClickAddShops: function () {

            var self = this;

            this.setState({
                countShowObj: self.state.countShowObj + 12
            });

            this.componentDidMount();

        },

        componentDidMount: function() {

            var self = this;

            $.ajax({
                method: "GET",
                url: "http://api.data.mos.ru/v1/datasets/1838/rows?$top=" + self.state.countShowObj + "&$orderby=Number",
                success: function(response) {
                    self.setState({myShops: response}, function() {
                        console.log(response);
                    });
                }
            });
        },

        render: function() {

            return (
                <div className={"app " + "container-fluid"}>
                    <h1>Second Hand</h1>
                    <Shops data={this.state.myShops} /> {/*добавили свойство data */}
                    <Loading shops={this.state.countShowObjs} onClickAddShops={this.onClickAddShops} />
                </div>
            );
        }
    });


    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );

});