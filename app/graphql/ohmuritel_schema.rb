class OhmuritelSchema < GraphQL::Schema
  default_max_page_size 50

  mutation(Types::MutationType)
  query(Types::QueryType)
  use(GraphQL::Batch)

  rescue_from(ActionPolicy::Unauthorized) do |exp|
    raise GraphQL::ExecutionError.new(
      exp.result.message,
      extensions: {
        code: :unauthorized,
        fullMessages: exp.result.reasons.full_messages,
        details: exp.result.reasons.details,
      }
    )
  end

  rescue_from(ActionPolicy::AuthorizationContextMissing) do
    raise GraphQL::ExecutionError.new(I18n.t("devise.failure.unauthenticated"))
  end

  rescue_from(ActiveRecord::RecordNotFound) do |err|
    raise GraphQL::ExecutionError, err.message
  end

  rescue_from(ActiveRecord::RecordInvalid) do |err|
    raise GraphQL::ExecutionError, err.message
  end
end
